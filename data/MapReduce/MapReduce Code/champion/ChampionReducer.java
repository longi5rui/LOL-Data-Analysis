import java.io.IOException;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;

public class ChampionReducer extends Reducer<IntWritable, Text, IntWritable, Text> {
    
    @Override
    public void reduce(IntWritable key, Iterable<Text> values, Context context) throws IOException, InterruptedException {
        
        int numPick = 0;
        int countWin = 0;
        int countFB = 0;
        int countKills = 0;
        double countKDA = 0;
        int countQuadra = 0;
        int countPenta = 0;
        
        for (Text value : values) {
            String[] line = value.toString().split("\\*");
            numPick++;
            countWin += Integer.parseInt(line[0]); // win rate when pick
            countFB += Integer.parseInt(line[1]);  // fb rate when pick
            countKills += Integer.parseInt(line[2]);  // kills sum when pick
            countKDA += Double.parseDouble(line[3]); // KDA sum when pick
            countQuadra += Integer.parseInt(line[4]);  // quadrakills sum
            countPenta += Integer.parseInt(line[5]);  // quadrakills sum
        }
        
        // calculate final result
        String winRate = String.format("%.2f", countWin / (double)numPick);
        String firstBloodRate = String.format("%.6f", countFB / (double)numPick);
        String averageKills = String.format("%.2f", countKills / (double)numPick);
        String averageKDA = String.format("%.2f", countKDA / (double)numPick);
        
        StringBuilder sb = new StringBuilder();
        sb.append(winRate).append("\t").append(firstBloodRate).append("\t").append(averageKills).append("\t").append(averageKDA).append("\t").append(countQuadra).append("\t").append(countPenta).append("\t").append(numPick);
        
        context.write(key, new Text(sb.toString()));
    }
}