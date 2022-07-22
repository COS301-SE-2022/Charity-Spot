import java.net.*;
import java.io.*;
import java.util.Scanner;

public class Server{

    private ServerSocket serverSocket;
    private Socket clientSocket;
    private BufferedReader s_in;
    private PrintWriter s_out;

    public void start(int port){

        try{

            serverSocket = new ServerSocket(port);

            System.out.println("Waiting for a client ...");

            while(true){

                clientSocket = serverSocket.accept();

                System.out.println("Client connected at " + clientSocket.getRemoteSocketAddress().toString());

                //Reader for the socket
                s_in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));

                //Writer for the socket
                s_out = new PrintWriter(clientSocket.getOutputStream(), true);

                String inMessage = s_in.readLine();

                System.out.println(inMessage);

                System.out.println("HTTP/1.1 200 OK\n"+
                    "Content-Type: application/json\n\n"+
                    "{"+'"'+"success"+'"'+":" + '"'+"true"+'"'+"}");

                s_out.println("HTTP/1.1 200 OK\n"+
                    "Content-Type: application/json\n\n"+
                    "{"+'"'+"success"+'"'+":" + '"'+"true"+'"'+"}");

                clientSocket.close();

            }

        }
        catch(IOException e){}

    }

}