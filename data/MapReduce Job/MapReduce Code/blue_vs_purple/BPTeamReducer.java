import java.io.IOException;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;

public class BPTeamReducer extends Reducer<IntWritable, IntWritable, IntWritable, Text> {
    
    @Override
    public void reduce(IntWritable key, Iterable<IntWritable> values, Context context) throws IOException, InterruptedException {
        
        int countWin = 0;
        int matchNum = 0;
        
        for (IntWritable value : values) {
            matchNum++;
            countWin += value.get();
        }
        
        String winRate = String.format("%.3f", countWin / (double)matchNum);
        
        context.write(key, new Text(winRate));
    }
}