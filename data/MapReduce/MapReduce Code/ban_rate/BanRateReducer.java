import java.io.IOException;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;

public class BanRateReducer extends Reducer<IntWritable, IntWritable, IntWritable, Text> {
    
    @Override
    public void reduce(IntWritable key, Iterable<IntWritable> values, Context context) throws IOException, InterruptedException {
        
        int countBan = 0;
        
        for (IntWritable value : values) {
            countBan++;
        }
        
        context.write(key, new Text(String.valueOf(countBan)));
    }
}