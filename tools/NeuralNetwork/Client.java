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

    private int NumOfCharities;

    private int[] input;
    private double[] normInput;

    private int[] charID;
    private double[] charIDR;

    Client(Socket clientSocket, BufferedReader inputS,  PrintWriter outS, NeuralNetwork nn){

        this.clientSocket = clientSocket;
        this.inputS = inputS;
        this.outS = outS;
        this.nn = nn;

        this.NumOfCharities = 0;

        try{

            BufferedReader brCount = new BufferedReader(new FileReader(new File("normalizedVal.txt")));

            String line;

            //Count the number of charities

            while((line = brCount.readLine()) != null){

                this.NumOfCharities++;

            }

            this.input = new int[this.NumOfCharities];
            this.normInput = new double[this.NumOfCharities];

            int i = 0;

            System.out.println(this.NumOfCharities);

            BufferedReader br = new BufferedReader(new FileReader(new File("normalizedVal.txt")));

            while((line = br.readLine()) != null){

                String[] split = line.split(",");

                this.input[i] = Integer.parseInt(split[0]);
                this.normInput[i] = Double.parseDouble(split[1]);

                i++;

            }

            i = 0;
            
            this.charID = new int[this.NumOfCharities];
            this.charIDR = new double[this.NumOfCharities];

            BufferedReader brID = new BufferedReader(new FileReader(new File("charID.txt")));

            while((line = brID.readLine()) != null){

                String[] split = line.split(",");

                this.charID[i] = Integer.parseInt(split[0]);
                this.charIDR[i] = Double.parseDouble(split[1]);

                i++;

            }

        }
        catch(Exception e){}


    }

    double getNormVal(int input){

        for(int i=0; i<this.NumOfCharities; i++){

            if(this.input[i] == input){
                return this.normInput[i];
            }
        }

        return 0;
    }

    double getCharRID(int input){

        for(int i=0; i<this.NumOfCharities; i++){

            if(this.charID[i] == input){
                return this.charIDR[i];
            }
        }

        return 0;
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


                for(int i=1; i<21; i++){

                    System.out.println(i+","+dayOfWeek+","+itemType+","+location+","+1+","+1);
                    System.out.println(getCharRID(i)+","+getNormVal((int)dayOfWeek)+","+getNormVal((int)itemType)+","+getNormVal((int)location)+","+getNormVal(1)+","+getNormVal(1));

                    double[] inVals = new double[]{getCharRID(i),getNormVal((int)dayOfWeek),getNormVal((int)itemType),getNormVal((int)location),getNormVal(1),getNormVal(1)};
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
            catch(Exception e){System.out.println(e);}

            return;

    }
}