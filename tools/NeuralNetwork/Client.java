import java.net.*;
import java.io.*;

import java.util.concurrent.TimeUnit;

class Client extends Thread{

    private Socket clientSocket;
    private BufferedReader inputS;
    private PrintWriter outS;

    Client(Socket clientSocket, BufferedReader inputS,  PrintWriter outS){
        this.clientSocket = clientSocket;
        this.inputS = inputS;
        this.outS = outS;
    }

    @Override
    public void run(){

            try{

                System.out.println("Client running on: " + Thread.currentThread().getName());

                String inMessage = this.inputS.readLine();

                try{ TimeUnit.SECONDS.sleep(10);}
                catch(Exception e){}

                outS.println("HTTP/1.1 200 OK\n"+
                        "Content-Type: application/json\n\n"+
                        "{"+'"'+"success"+'"'+":" + '"'+"true"+'"'+"}");

                clientSocket.close();

            }
            catch(Exception e){}

            return;

    }
}