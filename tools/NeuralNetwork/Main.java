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
	
		
		NeuralNetwork nn = new NeuralNetwork(6,15,1);
		
		List<Double>output;
		
		nn.fit(trainData, correctOutput, 500000);

		//Read input from user

		try{

			while(true){

				Scanner reader = new Scanner(System.in);

				System.out.println("Please enter a donation");
				System.out.println("Use the form: orgID, dayOfWeek, itemType, Loc, Month, Weather");
				System.out.println("Use the form: 1,1,1,1,1,1");

				double[] inVals = new double[6];

				String input = reader.nextLine();

				String[] split = input.split(",");

				for(int i=0; i<split.length; i++){

					double val = Double.parseDouble(split[i]);
					inVals[i] = val;

				}

				output = nn.predict(inVals);
				System.out.println(output.toString());

			}

		}
		catch(Exception e){}	

	}

}