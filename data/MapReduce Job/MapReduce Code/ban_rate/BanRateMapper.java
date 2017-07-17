import java.io.IOException;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;

public class BanRateMapper extends Mapper<LongWritable, Text, IntWritable, IntWritable> {
    
    @Override
    public void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
        
        String[] line = value.toString().split("\t");
        
        // output: champion_id  1, for each champion (at most 3)
        for (int i = 8; i < line.length; i++) {
            context.write(new IntWritable(Integer.parseInt(line[i])), new IntWritable(1));
        }
    }
}
