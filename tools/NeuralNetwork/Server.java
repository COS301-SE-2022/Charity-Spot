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

        double[][] trainData = getTrainData();

        List<Double> list = getListOfCharities(trainData);

        List<NeuralNetwork> neuralNetworks = getListOfNetworks(list,trainData); 

        System.out.println(list.toString());

        try{

            serverSocket = new ServerSocket(port);

            //create thread that will train the nn. Run every x amount of time

            System.out.println("Waiting for a clients...");

            while(true){

                clientSocket = serverSocket.accept();

                System.out.println("Client connected at " + clientSocket.getRemoteSocketAddress().toString());

                //Reader for the socket
                s_in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));

                //Writer for the socket
                s_out = new PrintWriter(clientSocket.getOutputStream(), true);

                Thread clientThread = new Client(clientSocket, s_in, s_out, neuralNetworks, list);

                clientThread.start();

            }

        }
        catch(IOException e){System.out.println(e);}

    }

    public static double[][] getTrainData(){

        double[][] trainData= new double[12534][];

	    double[][] correctOutput= new double[12534][];

        //Read in the donations from a file

        try{
			
			BufferedReader br = new BufferedReader(new FileReader(new File("donationsData.txt")));
			
			String line;

			int j = 0;

			while((line = br.readLine()) != null){

				/*trainData[j] = new double[6];
				correctOutput[j] = new double[1];
				int k = 0;

				String[] split = line.split(",");

				for(int i=0; i<split.length; i++){

					double val = Double.parseDouble(split[i]);

					if(i == split.length-1){
						correctOutput[j][0] = val;
						continue;
					}

					trainData[j][k] = val;

    				k++;
				}

				j++;*/

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

        /*//Two loops that can be used to check that the data has been read correctly

        for(int i=0; i<trainData.length; i++){

			for(int jj=0; jj<trainData[i].length; jj++){

				System.out.print(trainData[i][jj] + ", ");

			}

			System.out.println();

		}

		for(int i=0; i<correctOutput.length; i++){

			for(int jj=0; jj<correctOutput[i].length; jj++){

				System.out.print(correctOutput[i][jj] + ", ");

			}

			System.out.println();

		}

        //Create and train the new nn
        NeuralNetwork nn = new NeuralNetwork(6,25,1);
        nn.fit(trainData, correctOutput, 50000);

        return nn;*/

        /*List<Double> list = getListOfCharities(trainData);

        System.out.println(list.toString());

        double[][] matForChar = getMatrixForCharity(20,trainData);

        double[][] corrMatForChar = getCorrOutForCharity(20,trainData);

        /*for(int i=0; i<matForChar.length; i++){

			for(int jj=0; jj<matForChar[i].length; jj++){

				System.out.print(matForChar[i][jj] + ", ");

			}

			System.out.println();

		}

        for(int i=0; i<corrMatForChar.length; i++){

			for(int jj=0; jj<corrMatForChar[i].length; jj++){

				System.out.print(corrMatForChar[i][jj] + ", ");

			}

			System.out.println();

		}*/

        /*List<NeuralNetwork> neuralNetworks = new ArrayList<NeuralNetwork>();

        for(int i=0; i<list.size(); i++){

            double[][] matForChar = getMatrixForCharity(i,trainData);
            double[][] corrMatForChar = getCorrOutForCharity(i,trainData);

            NeuralNetwork newNetwork = new NeuralNetwork(5,25,1);
            newNetwork.fit(matForChar, corrMatForChar, 500000);

            neuralNetworks.add(newNetwork);
        } 

        return neuralNetworks;*/

    }

    static List<NeuralNetwork> getListOfNetworks(List<Double> list, double[][] trainData){

        List<NeuralNetwork> neuralNetworks = new ArrayList<NeuralNetwork>();

        for(int i=0; i<list.size(); i++){

            System.out.println(list.get(i));

            double[][] matForChar = getMatrixForCharity(list.get(i),trainData);
            double[][] corrMatForChar = getCorrOutForCharity(list.get(i),trainData);

            NeuralNetwork newNetwork = new NeuralNetwork(5,20,1);
            newNetwork.fit(matForChar, corrMatForChar, 500000);

            neuralNetworks.add(newNetwork);
        } 

        return neuralNetworks;

    }

    static List<Double> getListOfCharities(double[][] Data){

        List<Double> list = new ArrayList<Double>(); 

        for(int i=0; i<Data.length; i++){

            boolean found = false;

			for(int j=0; j<list.size(); j++){
                if(list.get(j)==Data[i][0]){
                    found = true;
                }
            }

            if(found==false){
                list.add(Data[i][0]);
            }

		}

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