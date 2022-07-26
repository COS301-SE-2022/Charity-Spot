import java.net.*;
import java.io.*;
import java.util.Scanner;

import java.util.concurrent.TimeUnit;

public class Server{

    private ServerSocket serverSocket;
    private Socket clientSocket;
    private BufferedReader s_in;
    private PrintWriter s_out;

    public void start(int port){

        NeuralNetwork nn = trainNewNetwork(); 

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

                Thread clientThread = new Client(clientSocket, s_in, s_out, nn);

                clientThread.start();

            }

        }
        catch(IOException e){System.out.println(e);}

    }

    public static NeuralNetwork trainNewNetwork(){

        double [][] trainData= new double[1860][];

	    double [][] correctOutput= new double[1860][];

        //Read in the donations from a file

        try{
			
			BufferedReader br = new BufferedReader(new FileReader(new File("donationsData.txt")));
			
			String line;

			int j = 0;

			while((line = br.readLine()) != null){

				trainData[j] = new double[6];
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

				j++;

			}

		}
		catch(Exception e){}

        //Two loops that can be used to check that the data has been read correctly

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
        nn.fit(trainData, correctOutput, 1500000);

        return nn;

    }

}