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

        try{

            serverSocket = new ServerSocket(port);

            System.out.println("Waiting for a clients...");

            while(true){

                clientSocket = serverSocket.accept();

                System.out.println("Client connected at " + clientSocket.getRemoteSocketAddress().toString());

                //Reader for the socket
                s_in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));

                //Writer for the socket
                s_out = new PrintWriter(clientSocket.getOutputStream(), true);

                Thread clientThread = new Client(clientSocket, s_in, s_out);

                clientThread.start();

            }

        }
        catch(IOException e){}

    }

}