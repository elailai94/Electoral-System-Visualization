# Electoral System Visualization

[![HTML Badge](http://forthebadge.com/images/badges/uses-html.svg)](http://forthebadge.com)

### About
Electoral System Visualization is a visual simulation of four different electoral system consisting of first-past-the-post (FPTP), Borda, Condorcet, and IRV. This project was inspired by a [webpage](http://www.zesty.ca/voting/sim) authored by Ka-Ping Yee and is written entirely in HTML5, CSS, and JavaScript.

### How Does It Work?
![policy_plane_example1](https://cloud.githubusercontent.com/assets/7763904/13036984/cf1c6754-d343-11e5-9756-5818fa764ff0.png)
![policy_plane_example2](https://cloud.githubusercontent.com/assets/7763904/13036985/d0c847e4-d343-11e5-9b4f-a0fc11c3fccc.png)

The simulation assumes that each candidate and voter can be plotted on a 2D plane. Imagine two axes of "Fiscal Policy" and "Social Policy". The diagram above shows such a plane with four election candidates plotted on it (the circles).

A voter can also be plotted on it (the square). This voter's first choice candidate is presumed to be the closest one. So in a FPTP election, this voter would vote for the green candidate.

Other voting systems use a "ranked ballot" -- a ballot where the voter can rank the candidates in order of preference. In our simulation, the candidates will be ranked by their Euclidian distance. This voter would rank green as their first choice (closest), blue as second, red as third, and finally yellow (farthest) as their fourth choice.

Now add more voters, all clustered around a "centre of opinion" (the cross). Most are close to the centre of opinion but others are far away, distributed in a normal distribution.

Now hold an election. Each of the voters casts a ballot with each candidate ranked by order of their distance from the voter. Count up the ballots to see who wins. Then colour the centre of opinion with the same colour as the winner.

Repeat the above for each point on the plane: move the "centre of opinion" to that point, scatter a large number of voters around that point, hold an election, and colour that point with the colour of the winner. Thus, each point on the plane represents an election with that point being the centre of public opinion. The result are images like those below.

Obviously, this is a simplification of real elections. However, they do give us insights into the behaviour of each system. Real world behaviour would be more complex than these simulations show.

### Screenshot
![Electoral_System_Visualization_Screenshot](https://cloud.githubusercontent.com/assets/7763904/13065843/72c0123a-d42e-11e5-87c8-2fd9d7bd24f4.png)

### Web Service Initialization
```Bash
cd webservice/bin
./eViz
```

### Web Application Access
You can open up eViz.html in a web browser.

### License
* Electoral System Visualization is licensed under the [MIT license](https://www.github.com/elailai94/Electoral-System-Visualization/blob/master/LICENSE.md).
