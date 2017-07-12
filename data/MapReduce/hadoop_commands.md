# Cloudera VM Hadoop 常用命令


## 1. 编译 Mapper / Reducer
javac -cp /etc/hadoop/conf:/etc/hadoop/conf:/etc/hadoop/conf:/usr/lib/hadoop/lib/*:/usr/lib/hadoop/.//*:/usr/lib/hadoop-hdfs/./:/usr/lib/hadoop-hdfs/lib/*:/usr/lib/hadoop-hdfs/.//*:/usr/lib/hadoop-yarn/lib/*:/usr/lib/hadoop-yarn/.//*:/usr/lib/hadoop-mapreduce/lib/*:/usr/lib/hadoop-mapreduce/.//*:/usr/lib/hadoop-yarn/.//*:/usr/lib/hadoop-yarn/lib/* -d . WinRateMapper.java

## 2. 编译 Driver
javac -cp /etc/hadoop/conf:/etc/hadoop/conf:/etc/hadoop/conf:/usr/lib/hadoop/lib/*:/usr/lib/hadoop/.//*:/usr/lib/hadoop-hdfs/./:/usr/lib/hadoop-hdfs/lib/*:/usr/lib/hadoop-hdfs/.//*:/usr/lib/hadoop-yarn/lib/*:/usr/lib/hadoop-yarn/.//*:/usr/lib/hadoop-mapreduce/lib/*:/usr/lib/hadoop-mapreduce/.//*:/usr/lib/hadoop-yarn/.//*:/usr/lib/hadoop-yarn/lib/*:. -d . WinRateDriver.java

## 3. 打包 jar
jar cvf winRate.jar *.class

## 4. 提交执行任务
hadoop jar winRate.jar WinRateDriver /user/cloudera/LOLAData/champion.txt /user/cloudera/LOLAData/output

## 5. copy 输出结果到当前目录
hdfs dfs -copyToLocal ./LOLAData/output/part-r-00000 ./

## 6. 删除已有目录
hdfs dfs -rm -r ./LOLAData/output
