import java.util.List;

//Neural Network with one hidden layer using the sigmoid activation function

public class NeuralNetwork{
    //1. Weight matrix for the input and hidden layer
    //2. Weight matrix for the hidden and output layer
    //3. Bias matrix for the hidden layer
    //4. Bias matrix for the output layer
    //5. Learing rate

    Matrix input_hidden_weights;
    Matrix hidden_output_weights;
    Matrix bias_for_hidden;
    Matrix bias_for_output;
    double learning_rate = 0.01;

    public NeuralNetwork(int input, int hidden, int output){

        //weight matrix for input to hidden
        //x input vals for each y neurons in the hidden layer
        input_hidden_weights = new Matrix(hidden, input);

        //weight matrix for hidden to output
        hidden_output_weights = new Matrix(output, hidden);

        //bias matrix for hidden layer
        bias_for_hidden = new Matrix(hidden, 1);

        //bias matrix for output layer
        bias_for_output = new Matrix(output, 1);
    }


    //Function used for forward propagation
    public List<Double> predict(double[] x){

        //Used to calculate output of a trained network

        //Step 1 = w1.x1 + ...
        //Step 2 = add bias 
        //Step 3 = apply activation function
        //f(w1.x1 + w2.x2 + ... + b)

        //Repeat steps for input to hidden and hidden to output

        Matrix input = Matrix.fromArray(x);

        //Step1:
        //calculate matrix that is the dot product of input_to_hidden weights
        //and the input given (w1.x1 + ... )
        Matrix hidden = Matrix.multiply(input_hidden_weights, input);

        //Step2:
        //add the bias to the new matrix
        hidden.add(bias_for_hidden);

        //Step3:
        //apply activation function
        hidden.sigmoid();


        //Repeat steps for the output layer
        Matrix output = Matrix.multiply(hidden_output_weights, hidden);
        output.add(bias_for_output);
        output.sigmoid();

        return output.toArray();
    }

    public void train(double[] x, double[] y){

        Matrix input = Matrix.fromArray(x);
        Matrix hidden = Matrix.multiply(input_hidden_weights, input);
        hidden.add(bias_for_hidden);
        hidden.sigmoid();

        Matrix output = Matrix.multiply(hidden_output_weights, hidden);
        output.add(bias_for_output);
        output.sigmoid();

        Matrix target = Matrix.fromArray(y);

        Matrix error = Matrix.subtract(target, output);
        Matrix gradient = output.dsigmoid();
        gradient.multiply(error);
        gradient.multiply(learning_rate);

        Matrix hidden_T = Matrix.transpose(hidden);
        Matrix who_delta = Matrix.multiply(gradient, hidden_T);

        hidden_output_weights.add(who_delta);
        bias_for_output.add(gradient);

        Matrix who_T = Matrix.transpose(hidden_output_weights);
        Matrix hidden_errors = Matrix.multiply(who_T, error);

        Matrix h_gradient = hidden.dsigmoid();
        h_gradient.multiply(hidden_errors);
        h_gradient.multiply(learning_rate);

        Matrix i_T = Matrix.transpose(input);
        Matrix wih_delta = Matrix.multiply(h_gradient, i_T);

        input_hidden_weights.add(wih_delta);
        bias_for_hidden.add(h_gradient);

    }

    public void fit(double[][] x, double[][] y, int epochs){

        for(int i=0; i<epochs; i++){
            int sampleN = (int)(Math.random() * x.length);
            this.train(x[sampleN], y[sampleN]);
        }

    }

}