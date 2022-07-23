import java.net.*;
import java.io.*;
import java.util.*;

import java.util.concurrent.TimeUnit;

class Client extends Thread{

    private Socket clientSocket;
    private BufferedReader inputS;
    private PrintWriter outS;
    private NeuralNetwork nn;

    Client(Socket clientSocket, BufferedReader inputS,  PrintWriter outS, NeuralNetwork nn){

        this.clientSocket = clientSocket;
        this.inputS = inputS;
        this.outS = outS;
        this.nn = nn;
        
    }

    @Override
    public void run(){

            try{

                System.out.println("Client running on: " + Thread.currentThread().getName());

                String inMessage = this.inputS.readLine();

                double[] inVals = new double[]{1,1,1,1,1,2};

                List<Double>output = nn.predict(inVals);

                try{ TimeUnit.SECONDS.sleep(10);}
                catch(Exception e){}

                outS.println("HTTP/1.1 200 OK\n"+
                        "Content-Type: application/json\n\n"+
                        "{"+'"'+"success"+'"'+":" + '"'+output.toString()+'"'+"}");

                clientSocket.close();

            }
            catch(Exception e){}

            return;

    }
}