import java.util.ArrayList;
import java.util.List;

public class Matrix{

    double [][]data;
    int rows;
    int cols;


    //Create a matrix and init values to random ints
    public Matrix(int rows, int cols){

        this.data = new double[rows][cols];
        this.rows = rows;
        this.cols = cols;

        for(int i=0; i<rows; i++){

            for(int j=0; j<cols; j++){

                data[i][j] = Math.random() * 2 - 1;

            }

        }

    }

    //Add a scalar value to the matrix
    public void add(double scalar){

        for(int i=0; i<this.rows; i++){
            
            for(int j=0; j<this.cols; j++){
                this.data[i][j] += scalar;
            }

        }

    }

    //Add a matrix to the current Matrix
    public void add(Matrix m){

        if(this.cols != m.cols || this.rows != m.rows){
            System.out.println("Invalid Matrix Addition");
            return;
        }

        for(int i=0; i<this.rows; i++){

            for(int j=0; j<this.cols; j++){
                this.data[i][j] += m.data[i][j];
            }

        }

    }

    //Subtract two matrices
    public static Matrix subtract(Matrix a, Matrix b){

        if(a.cols != b.cols || a.rows != b.rows){
            System.out.println("Invalid Matrix Subtraction");
            return null;
        }

        Matrix retMat = new Matrix(a.rows, a.cols);

        for(int i=0; i<a.rows; i++){

            for(int j=0; j<a.cols; j++){

                retMat.data[i][j] = a.data[i][j] - b.data[i][j];

            }

        }

        return retMat;
    }

    //Transpose a matrix
    public static Matrix transpose(Matrix a){

        Matrix retMat = new Matrix(a.cols, a.rows);

        for(int i=0; i<a.rows; i++){

            for(int j=0; j<a.cols; j++){

                retMat.data[j][i] = a.data[i][j];
            }

        }

        return retMat;
        
    }

    //Calculate dot product of two matrices
    public static Matrix multiply(Matrix a, Matrix b){

        Matrix retMat = new Matrix(a.rows, b.cols);

        for(int i=0; i<retMat.rows; i++){

            for(int j=0; j<retMat.cols; j++){

                double sum = 0;

                for(int k=0; k<a.cols; k++){

                    sum += a.data[i][k] * b.data[k][j];

                }

                retMat.data[i][j] = sum;

            }

        }

        return retMat;

    }

    //Element-wise multiplication of matrices
    public void multiply(Matrix a){

        for(int i=0; i<a.rows; i++){

            for(int j=0; j<a.cols; j++){
                
                this.data[i][j] *= a.data[i][j];

            }

        }

    }

    //Multiply matrix with a scaler
    public void multiply(double a){

        for(int i=0; i<this.rows; i++){

            for(int j=0; j<this.cols; j++){

                this.data[i][j] *= a;
            }

        }
        
    }

    //Sigmoid activation function
    public void sigmoid(){

        for(int i=0; i<this.rows; i++){

            for(int j=0; j<this.cols; j++){

                this.data[i][j] = 1/(1 + Math.exp(-(this.data[i][j])));

            }

        }

    }

    //Derivative of sigmoid used for backpropogation
    public Matrix dsigmoid(){

        Matrix retMat = new Matrix(this.rows, this.cols);

        for(int i=0; i<this.rows; i++){

            for(int j=0; j<this.cols; j++){

                retMat.data[i][j] = this.data[i][j] * (1-this.data[i][j]);

            }

        }

        return retMat;

    }

    //Array to matrix helper function
    public static Matrix fromArray(double[] x){

        Matrix retMat = new Matrix(x.length, 1);

        for(int i=0; i<x.length; i++){

            retMat.data[i][0] = x[i];

        }

        return retMat;
    }

    //Matrix to array list helper function
    public List<Double> toArray(){

        List<Double> retList = new ArrayList<Double>();

        for(int i=0; i<this.rows; i++){

            for(int j=0; j<this.cols; j++){

                retList.add(this.data[i][j]);
            }

        }

        return retList;
    }

}