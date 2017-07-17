import java.io.IOException;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;

public class FactorReducer extends Reducer<Text, Text, Text, Text> {
    
    @Override
    public void reduce(Text key, Iterable<Text> values, Context context) throws IOException, InterruptedException {
        
        int numResult = 0;
        int firstBlood = 0;
        int firstTower = 0;
        int firstInhibitor = 0;
        int firstBaron = 0;
        int dragonKills = 0;
        int baronKills = 0;
        StringBuilder sb = new StringBuilder();
        
        for (Text value : values) {
            numResult++;
            String[] factors = value.toString().split("\\*");
            firstBlood += Integer.parseInt(factors[0]);
            firstTower += Integer.parseInt(factors[1]);
            firstInhibitor += Integer.parseInt(factors[2]);
            firstBaron += Integer.parseInt(factors[3]);
            dragonKills += Integer.parseInt(factors[4]);
            baronKills += Integer.parseInt(factors[5]);
        }
        
        String firstBloodRate = String.format("%.2f", firstBlood / (double)numResult);
        String firstTowerRate = String.format("%.2f", firstTower / (double)numResult);
        String firstInhibitorRate = String.format("%.2f", firstInhibitor / (double)numResult);
        String firstBaronRate = String.format("%.2f", firstBaron / (double)numResult);
        String averageDragonKills = String.format("%.2f", dragonKills / (double)numResult);
        String averageBaronKills = String.format("%.2f", baronKills / (double)numResult);
        
        // generate final factors result
        sb.append(firstBloodRate).append("\t").append(firstTowerRate).append("\t").append(firstInhibitorRate)
        .append("\t").append(firstBaronRate).append("\t").append(averageDragonKills).append("\t").append(averageBaronKills);
        
        context.write(key, new Text(sb.toString()));
    }
}