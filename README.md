# LOLA

## 1. Introduction

Factors such as player skill, game character choice, game strategy and pace all have influence on a LOL ([League of Legends](http://gameinfo.na.leagueoflegends.com/en/game-info/get-started/)) game result. LOL will both enhance or weaken some game characters according to their performance, win rates and players’ feedback in different version. Players are more likely to win if they could have a deep understanding of game and know about the character data in each patch. While these analytical data should be computed based on a large dataset and ordinary players cannot easily get it. I used scripts to collect a large dataset of ranked matches in latest version of LOL and applied Hadoop Map-Reduce to analyze it and build a website to visualize the interesting and useful computing results.

## 2. Design

![](file:///Users/jrui/Desktop/Screen%20Shot%202017-08-11%20at%2000.50.21.png)

#### Design Explanation

- **Data Collection:** Node.js scripts deployed on a EC2 instance will keep collecting fresh game matches data by calling LOL APIs, do the simple data cleansing and store them to the AWS ElasticSearch server.
- **Data Cleansing:** Node.js scripts on the same EC2 instance will periodically dump all data, format them to be readable by MapReduce job, store the formatted data to AWS S3 and use Simple Notification Service ([SNS](https://aws.amazon.com/sns/)) to notify the worker instance to fetch them.
- **MapReduce:** Hadoop deployed on a single EC2 instance will fetch data from S3, do all the MapReduce jobs and send the final computing results to web server.
- **Web Server:** The website implemented using Node.js, AngularJS, Chart.js and Bootstrap and deployed by AWS Elastic Beanstalk will visualize the computing results and interact with user to provide more customized analysis.

## 3. Future Work

(1) In the Node.js scripts, I used plenty of callback functions to implement the logic, which also made me trapped in "Callback Hell". Promise frameworks should be applied to replace them to make code maintainable and more readable.

(2) I am working on introducing ml.js which is a JavaScript Machine learning library, to predict the win rate for game charactor combinations given by user.

(3) Spark could be introduced to replace the Hadoop due to higher performance.

