import java.util.List;
import java.io.*;

public class Main {

    static double [][] trainData= new double[360][];

	static double [][] correctOutput= new double[360][];

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

	

	
		
		NeuralNetwork nn = new NeuralNetwork(3,15,4);
		
		
		List<Double>output;
		
		nn.fit(trainData, correctOutput, 60000);


		

		for(double d[]:trainData)
		{
			output = nn.predict(d);
			System.out.println(output.toString());
		}		

	}

}