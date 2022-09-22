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
    private List<NeuralNetwork> nn;
    private List<String> Charities;

    private int NumOfCharities;


    private int[] inputDOW;
    private double[] normDOW;

    private int[] inputTOI;
    private double[] normTOI;

    private int[] inputLOC;
    private double[] normLOC;

    private int[] inputMON;
    private double[] normMON;

    private int[] inputWEA;
    private double[] normWEA;


    Client(Socket clientSocket, BufferedReader inputS,  PrintWriter outS, List<NeuralNetwork> nn, List<String> Charities){

        this.clientSocket = clientSocket;
        this.inputS = inputS;
        this.outS = outS;
        this.nn = nn;
        this.Charities = Charities;

        this.NumOfCharities = 0;

        try{

            BufferedReader brCount = new BufferedReader(new FileReader(new File("charID.txt")));

            String line;

            //Count the number of charities

            while((line = brCount.readLine()) != null){

                this.NumOfCharities++;

            }

                //Vals for Day of week
                int i = 0;
            
                this.inputDOW = new int[7];
                this.normDOW = new double[7];

                BufferedReader brID = new BufferedReader(new FileReader(new File("normalizedDOW.txt")));

                while((line = brID.readLine()) != null){

                    String[] split = line.split(",");

                    this.inputDOW[i] = Integer.parseInt(split[0]);
                    this.normDOW[i] = Double.parseDouble(split[1]);

                    i++;

                }

                //Vals for Type of item
                i = 0;
            
                this.inputTOI = new int[6];
                this.normTOI = new double[6];

                brID = new BufferedReader(new FileReader(new File("normalizedTOI.txt")));

                while((line = brID.readLine()) != null){

                    String[] split = line.split(",");

                    this.inputTOI[i] = Integer.parseInt(split[0]);
                    this.normTOI[i] = Double.parseDouble(split[1]);

                    i++;

                }

                //Vals for location
                i = 0;
            
                this.inputLOC = new int[9];
                this.normLOC = new double[9];

                brID = new BufferedReader(new FileReader(new File("normalizedLOC.txt")));

                while((line = brID.readLine()) != null){

                    String[] split = line.split(",");

                    this.inputLOC[i] = Integer.parseInt(split[0]);
                    this.normLOC[i] = Double.parseDouble(split[1]);

                    i++;

                }

                //Vals for Month
                i = 0;
            
                this.inputMON = new int[12];
                this.normMON = new double[12];

                brID = new BufferedReader(new FileReader(new File("normalizedMON.txt")));

                while((line = brID.readLine()) != null){

                    String[] split = line.split(",");

                    this.inputMON[i] = Integer.parseInt(split[0]);
                    this.normMON[i] = Double.parseDouble(split[1]);

                    i++;

                }

                //Vals for weather
                i = 0;
            
                this.inputWEA = new int[3];
                this.normWEA = new double[3];

                brID = new BufferedReader(new FileReader(new File("normalizedWEA.txt")));

                while((line = brID.readLine()) != null){

                    String[] split = line.split(",");

                    this.inputWEA[i] = Integer.parseInt(split[0]);
                    this.normWEA[i] = Double.parseDouble(split[1]);

                    i++;

                }

        }
        catch(Exception e){e.printStackTrace();}


    }

    double getNormVal(int input, char type){

        switch(type){

            case 'b':
                for(int i=0; i<inputDOW.length; i++){
                    if(inputDOW[i] == input){
                        return this.normDOW[i];
                    }
                }
                break;

            case 'c':
                for(int i=0; i<inputTOI.length; i++){
                    if(inputTOI[i] == input){
                        return this.normTOI[i];
                    }
                }
                break;

            case 'd':
                for(int i=0; i<inputLOC.length; i++){
                    if(inputLOC[i] == input){
                        return this.normLOC[i];
                    }
                }
                break;

            case 'e':
                for(int i=0; i<inputMON.length; i++){
                    if(inputMON[i] == input){
                        return this.normMON[i];
                    }
                }
                break;

            case 'f':
                for(int i=0; i<inputWEA.length; i++){
                    if(inputWEA[i] == input){
                        return this.normWEA[i];
                    }
                }
                break;

            default:
                return 0;
            

        }

        return 0;

    }        
    

    @Override
    public void run(){

            try{

                System.out.println("New thread created\n");

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


                double[] inVals = new double[]{getNormVal((int)dayOfWeek,'b'),getNormVal((int)itemType,'c'),getNormVal((int)location,'d'),getNormVal(1,'e'),getNormVal(1,'f')};

                List<OrgInfo> outputList = new ArrayList<OrgInfo>();

                for(int i=0; i<this.Charities.size();i++){
                    
                    NeuralNetwork current = this.nn.get(i);
                    List<Double>output = current.predict(inVals);
                    OrgInfo newResult = new OrgInfo(this.Charities.get(i), output.get(0));
                    outputList.add(newResult);
                }

                Collections.sort(outputList);
                Collections.reverse(outputList);

                if(outputList.size() == 0){

                    String returnStr = "{" + '"' + "results" + '"' + " : [\n" + "\n]\n}";

                    outS.println("HTTP/1.1 200 OK\n"+
                    "Content-Type: application/json\n\n"+ returnStr);

                    clientSocket.close();

                    return;

                }

                double topScore = outputList.get(0).OrgScore;

                List<OrgInfo> retList = new ArrayList<OrgInfo>();

                for(int i=0; i<outputList.size(); i++){
                    if(((topScore - outputList.get(i).OrgScore) < 0.3) && (outputList.get(i).OrgScore > 0.05)){
                        retList.add(outputList.get(i));
                    }
                }

                for(int i=0; i<retList.size(); i++){
                    retList.get(i).OrgScore = Math.round(retList.get(i).OrgScore*100.0)/100.0;
                }

                String returnStr = "{" + '"' + "results" + '"' + " : [\n";

                boolean run = false;

                for(int i=0; i<retList.size(); i++){
                    run = true;
                    String oID = retList.get(i).OrgID;
                    returnStr = returnStr + "{" + '"' + "OrgID" + '"'+" : " + '"' + oID + '"'+", " + '"' + "Result" + '"' +" : " + '"' + retList.get(i).OrgScore + '"' + " },\n";
                }

                if(run){
                    returnStr = returnStr.substring(0, returnStr.length() - 2);
                }

                returnStr = returnStr + "\n]\n}";

                System.out.println("HTTP/1.1 200 OK\n"+
                        "Content-Type: application/json\n\n"+ returnStr + "\n");
                

                outS.println("HTTP/1.1 200 OK\n"+
                        "Content-Type: application/json\n\n"+ returnStr);

                clientSocket.close();

            }
            catch(Exception e){e.printStackTrace();}

            return;

    }
    
}