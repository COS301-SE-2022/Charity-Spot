public class NeuralNetwork{
    //1. Weight matrix for the input and hidden layer
    //2. Weight matrix for the hidden and output layer
    //3. Bias matrix for the hidden layer
    //4. Bias matrix for the ouput layer
    //5. Learing rate

    Matrix input_hidden_weights;
    Matrix hidden_output_weights;
    Matrix bias_for_hidden;
    Matrix bias_for_output;
    double learning_rate = 0.01;
}