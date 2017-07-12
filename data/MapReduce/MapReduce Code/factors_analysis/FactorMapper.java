import java.io.IOException;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;

public class FactorMapper extends Mapper<LongWritable, Text, Text, Text> {
    
    @Override
    public void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
        
        String[] line = value.toString().split("\t");
        StringBuilder sb = new StringBuilder();
        
        for (int i = 2; i <= 5; i++) {
            int n = line[i].equals("true") ? 1 : 0;
            sb.append(n).append('*'); // delimiter to seperate different factors
        }
        
        sb.append(line[6]).append('*'); // dragon kills amount
        sb.append(line[7]); // baron kills amount
 
        context.write(new Text(line[1]), new Text(sb.toString()));
    }
}
