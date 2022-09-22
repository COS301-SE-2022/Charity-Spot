import java.net.*;
import java.io.*;
import java.util.Scanner;
import java.util.*;  

import java.util.concurrent.TimeUnit;

public class Server{

    private ServerSocket serverSocket;
    private Socket clientSocket;
    private BufferedReader s_in;
    private PrintWriter s_out;

    public void start(int port){

        System.out.println("\u001b[32m\nStarting AI\n\u001b[37m");

        double[][] trainData = getTrainData();

        List<Double> list = getListOfCharities(trainData);

        List<String> listID = getListOfCharitiesID(trainData);

        List<NeuralNetwork> neuralNetworks = getListOfNetworks(list,trainData);

        System.out.println("\u001b[32m\nAI Finished Training\n\u001b[37m"); 

        //System.out.println(listID.toString());

        try{

            serverSocket = new ServerSocket(port);

            //create thread that will train the nn. Run every x amount of time

            System.out.println("Waiting for a clients...\n");

            while(true){

                clientSocket = serverSocket.accept();

                System.out.println("\u001B[31mClient connected at " + clientSocket.getRemoteSocketAddress().toString() + "\u001B[37m\n");

                //Reader for the socket
                s_in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));

                //Writer for the socket
                s_out = new PrintWriter(clientSocket.getOutputStream(), true);

                Thread clientThread = new Client(clientSocket, s_in, s_out, neuralNetworks, listID);

                clientThread.start();

            }

        }
        catch(IOException e){System.out.println(e);}

    }

    public static double[][] getTrainData(){

        int donoCount = 0;

        try{

            BufferedReader brCount = new BufferedReader(new FileReader(new File("donationsData.txt")));

            String line;

            //Count the number of donations

            while((line = brCount.readLine()) != null){

                donoCount++;

            }

        }
        catch(Exception e){}

        double[][] trainData= new double[donoCount][];

	    double[][] correctOutput= new double[donoCount][];

        //Read in the donations from a file

        try{
			
			BufferedReader br = new BufferedReader(new FileReader(new File("donationsData.txt")));
			
			String line;

			int j = 0;

			while((line = br.readLine()) != null){

                trainData[j] = new double[7];

                String[] split = line.split(",");

                int k = 0;
			
				for(int i=0; i<split.length; i++){

                    double val = Double.parseDouble(split[i]);

					trainData[j][k] = val;

                    k++;

                }

                j++;


			}

		}
		catch(Exception e){}

        return trainData;

    }

    static List<NeuralNetwork> getListOfNetworks(List<Double> list, double[][] trainData){

        List<NeuralNetwork> neuralNetworks = new ArrayList<NeuralNetwork>();

        for(int i=0; i<list.size(); i++){

            System.out.println(list.get(i));

            double[][] matForChar = getMatrixForCharity(list.get(i),trainData);
            double[][] corrMatForChar = getCorrOutForCharity(list.get(i),trainData);

            //System.out.println(matForChar[0].length + " , " + corrMatForChar[0].length);

            NeuralNetwork newNetwork = new NeuralNetwork(5,20,1);
            newNetwork.fit(matForChar, corrMatForChar, 2500000);

            neuralNetworks.add(newNetwork);
        } 

        return neuralNetworks;

    }

    static List<Double> getListOfCharities(double[][] Data){

        List<Double> list = new ArrayList<Double>(); 

        try{
			
		    BufferedReader br = new BufferedReader(new FileReader(new File("charID.txt")));
			
		    String line;

		    int j = 0;

		    while((line = br.readLine()) != null){

                String[] split = line.split(",");

                list.add(Double.parseDouble(split[1]));

            }

        }
        catch(Exception e){}

        return list;

    }

    static List<String> getListOfCharitiesID(double[][] Data){

        List<String> list = new ArrayList<String>(); 

        try{
			
		    BufferedReader br = new BufferedReader(new FileReader(new File("charID.txt")));
			
		    String line;

		    int j = 0;

		    while((line = br.readLine()) != null){

                String[] split = line.split(",");

                list.add(split[0]);

            }

        }
        catch(Exception e){}

        return list;

    }

    static double[][] getMatrixForCharity(double ID, double[][] Data){

        int size=0;

        for(int i=0; i<Data.length; i++){

            if(Data[i][0]==ID){
                size++;
            }

        }

        double[][] newMat = new double[size][];

        int count=0;

        for(int i=0; i<Data.length; i++){

            if(Data[i][0]==ID){

                newMat[count] = new double[5];

                for(int j=0; j<5; j++){
                    newMat[count][j] = Data[i][j+1];
                }

                count++;
            }

        }

        return newMat;
        
    }

    static double[][] getCorrOutForCharity(double ID, double[][] Data){

        int size=0;

        for(int i=0; i<Data.length; i++){

            if(Data[i][0]==ID){
                size++;
            }

        }

        double[][] newMat = new double[size][];

        int count=0;

        for(int i=0; i<Data.length; i++){

            if(Data[i][0]==ID){

                newMat[count] = new double[1];

                newMat[count][0] = Data[i][6];

                count++;
            }

        }

        return newMat;

    }

}