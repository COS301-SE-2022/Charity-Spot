import java.util.List;
import java.io.*;

public class Main {

    static double [][] trainData= new double[360][];

	static double [][] correctOutput= new double[360][];

	public static void main(String[] args) {

		try{
			
			BufferedReader br = new BufferedReader(new FileReader(new File("mockDonations.txt")));
			
			String line;

			while((line = br.readLine()) != null){

				for (int i=0; i < line.length(  ); i++){

					if(line.charAt(i) == ' ' || line.charAt(i) == ','){
						continue;
					}

					double val = (double) (line.charAt(i) - '0');

    				System.out.print(val);

				}

				System.out.println();

			}  

			

		}
		catch(Exception e){}

		System.out.println(trainData.length);

	
		
		/*NeuralNetwork nn = new NeuralNetwork(3,10,4);

		/* [
		
		
		List<Double>output;
		
		nn.fit(trainData, correctOutput, 50000);


		double [][] input = {
				{0,0},{0,1},{1,0},{1,1}	
		};

		for(double d[]:input)
		{
			output = nn.predict(d);
			System.out.println(output.toString());
		}*/		

	}

}