import java.io.IOException;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;

public class ChampionMapper extends Mapper<LongWritable, Text, IntWritable, Text> {
    
    @Override
    public void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
        
        String[] line = value.toString().split("\t");
        
        int result = line[1].equals("win") ? 1 : 0;
        int firstBloodKill = line[7].equals("true") ? 1 : 0;
        String kills = line[3];
        String KDA = line[4];
        String quadraKills = line[5];
        String pentaKills = line[6];
        
        // use '*' as seperator
        StringBuilder sb = new StringBuilder();
        sb.append(result).append('*').append(firstBloodKill).append('*').append(kills).append('*').append(KDA).append('*').append(quadraKills).append('*').append(pentaKills);
        
        // output: championId => championInfoInThisMatch
        context.write(new IntWritable(Integer.parseInt(line[0])), new Text(sb.toString()));
    }
}
