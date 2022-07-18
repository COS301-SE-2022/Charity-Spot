import java.util.List;
import java.io.*;

public class Main {

    static double [][] trainData= new double[360][];

	static double [][] correctOutput= new double[360][];

	public static void main(String[] args) {

		try{

			PushbackInputStream input = new PushbackInputStream(new FileInputStream("mockDonations.txt"));

			int charV = input.read();

			String st;

			int i = 0;

			while (charV != -1){

				trainData[i] = new double[3];
				trainData[i][0] = 1; 

				if(charV == 10){
					System.out.print(" new line");
				}

				System.out.print((char)charV);

				charV = input.read();
			}

		}
		catch(Exception e){}

		System.out.println(trainData[0].length);

	
		
		/*NeuralNetwork nn = new NeuralNetwork(2,10,1);

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