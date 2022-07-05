public class Matrix{

    double [][]data;
    int rows;
    int cols;


    //Create a matrix and init values to 0
    public Matrix(int rows, int cols){

        this.data = new double[rows][cols];
        this.rows = rows;
        this.cols = cols;

        for(int i=0; i<rows; i++){

            for(int j=0; j<cols; j++){

                data[i][j] = 0;

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
            return;
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
        
    }



}