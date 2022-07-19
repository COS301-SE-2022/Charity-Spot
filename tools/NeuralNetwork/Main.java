import java.util.*;
import java.io.*;

public class Main {

    static double [][] trainData= new double[720][];

	static double [][] correctOutput= new double[720][];

	public static void main(String[] args) {

		try{
			
			BufferedReader br = new BufferedReader(new FileReader(new File("mockDonations.txt")));
			
			String line;

			int j = 0;

			while((line = br.readLine()) != null){

				trainData[j] = new double[3];
				correctOutput[j] = new double[4];
				int k = 0;

				for (int i=0; i < line.length(  ); i++){

					if(i==0){

						if(line.charAt(i) == '1'){
							correctOutput[j] = new double[]{1, 0, 0, 0};
						}
						else if(line.charAt(i) == '2'){
							correctOutput[j] = new double[]{0, 1, 0, 0};
						}
						else if(line.charAt(i) == '3'){
							correctOutput[j] = new double[]{0, 0, 1, 0};
						}
						else if(line.charAt(i) == '4'){
							correctOutput[j] = new double[]{0, 0, 0, 1};
						}

						continue;
					}

					if(line.charAt(i) == ' ' || line.charAt(i) == ','){
						continue;
					}

					double val = (double) (line.charAt(i) - '0');

					trainData[j][k] = val;

    				k++;

				}

				j++;

			}

		}
		catch(Exception e){}

		/*for(int i=0; i<trainData.length; i++){

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

		}*/    

	

	
		
		NeuralNetwork nn = new NeuralNetwork(3,35,4);
		
		
		List<Double>output;
		
		nn.fit(trainData, correctOutput, 1000000);

		//Read input from user

		try{

			while(true){

				Scanner reader = new Scanner(System.in);

				System.out.println("Please enter the day of the week");

				Double dayOfWeek = reader.nextDouble();

				System.out.println("Please enter the type of the item");
				System.out.println("1: Clothes, 2: Food, 3: Stationary, 4: Other");

				Double typeOfItem = reader.nextDouble();

				System.out.println("Please enter your location");
				System.out.println("1: Pretoria, 2: Johannesburg, 3: Cape Town");

				Double location = reader.nextDouble();

				double[] input = new double[3];
				
				input[0] = dayOfWeek;
				input[1] = typeOfItem;
				input[2] = location;

				output = nn.predict(input);
				System.out.println(output.toString());

			}

		}
		catch(Exception e){}



		

		/*for(double d[]:trainData)
		{
			output = nn.predict(d);
			System.out.println(output.toString());
		}*/		

	}

}