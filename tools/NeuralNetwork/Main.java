import java.util.List;

public class Main {

    static double [][] trainData= {
			{0,0},
			{1,0},
			{0,1},
			{1,1}
	};
	static double [][] correctOutput= {
			{0},{1},{1},{0}
	};

	public static void main(String[] args) {
		
		NeuralNetwork nn = new NeuralNetwork(2,10,1);

		/* [*/
		
		
		List<Double>output;
		
		nn.fit(trainData, correctOutput, 50000);

		
		double [][] input = {
				{0,0},{0,1},{1,0},{1,1}	
		};

		for(double d[]:input)
		{
			output = nn.predict(d);
			System.out.println(output.toString());
		}		

	}

}