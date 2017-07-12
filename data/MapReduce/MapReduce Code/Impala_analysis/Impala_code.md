# Impala Code for Analysis

## 1. Champion

```
$ hdfs dfs -put ./part-r-00000 ./ImpalaInput
$ impala-shell
impala> create external table champion (championId int, win_rate double,
		fblood_rate double, average_kills double, average_kda double,
		count_quadra int, count_penta int, pick_num int) 
		row format delimited fields terminated by "\t" 
		location '/user/cloudera/ImpalaInput/';
impala> select championId,win_rate from champion order by win_rate limit 8;
impala> select championId,win_rate from champion order by win_rate DESC limit 8;

impala> select championId,fblood_rate from champion order by fblood_rate limit 8;
impala> select championId,fblood_rate from champion order by fblood_rate DESC limit 8;

impala> select championId,average_kills from champion order by average_kills limit 8;
impala> select championId,average_kills from champion order by average_kills DESC limit 8;

impala> select championId,average_kda from champion order by average_kda limit 8;
impala> select championId,average_kda from champion order by average_kda DESC limit 8;impala> select championId,count_quadra from champion order by count_quadra DESC limit 8;
impala> select championId,count_penta from champion order by count_penta DESC limit 8;

impala> select championId,pick_num from champion order by pick_num limit 8;
impala> select championId,pick_num from champion order by pick_num DESC limit 8;```

## 2. Champion Ban Rate

```
$ hdfs dfs -put ./part-r-00000 ./ImpalaInput
$ impala-shell
impala> create external table ban_rate (championId int, banNum int) 
		row format delimited fields terminated by "\t" 
		location '/user/cloudera/ImpalaInput/';
impala> select * from ban_rate order by bannum limit 8;
impala> select * from ban_rate order by bannum DESC limit 8;```