import java.net.*;
import java.io.*;
import java.util.*;
import java.time.*;
import java.time.format.DateTimeFormatter;

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

        BufferedReader br = new BufferedReader(new FileReader(new File("normalizedVal.txt")));

        String line;

		int j = 0;

		while((line = br.readLine()) != null){

            System.out.println(line);

        }

    }

        
    }

    @Override
    public void run(){

            try{

                System.out.println("New thread created");

                //Client will send date, type of item, location of donation

                String inMessage = this.inputS.readLine();

                System.out.println(inMessage);

                    //remove GET /
                    String[] split = inMessage.split("/");
                    inMessage = split[1];

                    //remove HTTP
                    split = inMessage.split(" ");
                    inMessage = split[0];

                    //split three values
                    split = inMessage.split(",");

                //Get the day of the week from the date
                String dateString = "2022-"+split[0];
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                LocalDate dateT = LocalDate.parse(dateString, formatter);
                double dayOfWeek = dateT.getDayOfWeek().getValue();

                //Get the item Type
                double itemType = Double.parseDouble(split[1]);

                //Get the location
                double location = Double.parseDouble(split[2]);

                System.out.println(dayOfWeek);


                for(int i=1; i<21; i++){

                    double[] inVals = new double[]{i,dayOfWeek,itemType,location,1,1};
                    List<Double>output = nn.predict(inVals);
                    System.out.println(i + ": " + output.toString());

                }

                //List<Double>output = nn.predict(inVals);

                /*try{ TimeUnit.SECONDS.sleep(10);}
                catch(Exception e){}*/

                //System.out.println(output.toString());

                outS.println("HTTP/1.1 200 OK\n"+
                        "Content-Type: application/json\n\n"+
                        "{"+'"'+"success"+'"'+":" + '"'+"true"+'"'+"}");

                clientSocket.close();

            }
            catch(Exception e){}

            return;

    }
}