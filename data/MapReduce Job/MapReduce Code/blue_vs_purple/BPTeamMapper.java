import java.io.IOException;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;

public class BPTeamMapper extends Mapper<LongWritable, Text, IntWritable, IntWritable> {
    
    @Override
    public void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
        
        String[] line = value.toString().split("\t");
        int result = line[1].equals("win") ? 1 : 0;
        
        context.write(new IntWritable(Integer.parseInt(line[0])), new IntWritable(result));
    }
}
