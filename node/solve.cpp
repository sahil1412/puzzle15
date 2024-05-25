#include <bits/stdc++.h>
using namespace std;
#define N 4

int cost(vector<vector<int>> initial,vector<vector<int>> target){
    int count = 0;
    for(int i=0;i<initial.size();i++){
        for(int j=0;j<initial[0].size();j++){
            if(initial[i][j] != target[i][j] && initial[i][j]!= 0){
                count++;
            }
        }
    }
    return count;
}

pair<int,int> spacePosition(vector<vector<int>> initial){
    int r=-1,c=-1;
    for(int i=0;i<initial.size();i++){
        for(int j=0;j<initial[0].size();j++){
            if(initial[i][j] == 0){
                r = i;
                c = j;
                break;
            }
        }
    }
    return {r,c};
}

map<vector<vector<int>>,vector<vector<int>>> mp;
int nextState(vector<vector<int>> initial,vector<vector<int>> target){

    int dist = cost(initial,target);
    vector<pair<int,int>> dirs = {{0,1},{0,-1},{1,0},{-1,0}};

    // mapping parent to child for retrace
    //map<vector<vector<int>>,vector<vector<vector<int>>>> mp;

    // min heap contains minimum cost, state
    priority_queue<pair<int,vector<vector<int>>>,vector<pair<int,vector<vector<int>>>>,greater<pair<int,vector<vector<int>>>>> pq;
    pq.push({dist,initial});

    // push state to set to check uniqueness
    set<vector<vector<int>>> st;
    st.insert(initial);
    int height = 0;
    while(!pq.empty()){
        int size = pq.size();
        for(int i=0;i<size;i++){
            auto top = pq.top();
            pq.pop();
            int current = top.first;
            vector<vector<int>> state = top.second;
            pair<int,int> pos = spacePosition(state);
            int x = pos.first;
            int y = pos.second;

            for(auto dir : dirs){
                if(x - dir.first >= 0 && y - dir.second >= 0 && x - dir.first < state.size() && y - dir.second < state[0].size()){
                    vector<vector<int>> temp = state;
                    temp[x][y] = temp[x - dir.first][y - dir.second];
                    temp[x - dir.first][y - dir.second] =  0;
                    int dist = cost(temp,target);
                    if(st.find(temp) == st.end()){
                        mp[temp]= state;
                        pq.push({dist,temp});
                        st.insert(temp);
                    }
                    if(temp == target) return height;
                }
            }
        }
        height++;
    }
    return 0;
}

vector<vector<vector<int>>> leaf_to_root_path(map<vector<vector<int>>,vector<vector<int>>> mp,vector<vector<int>> leaf){
    vector<vector<vector<int>>> path;
    vector<vector<int>> current = leaf;

    while(mp.find(current) != mp.end()){
        path.push_back(current);
        current = mp[current];
    }
    path.push_back(current);

    return path;
}
vector<int> take_int(string str) {
    stringstream ss(str);
    vector<int> result;
    char ch;
    int tmp;
    while(ss >> tmp) {
        result.push_back(tmp);
        ss >> ch;
    }
    return result;
}
int main(int argc, char* argv[]){

      if (argc != 2) {
        cerr << "Usage: " << argv[0] << " \"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16\"" << endl;
        return 1;
    }

    // Parse the input array from the command-line argument
    string inputArg = argv[1];
    // Remove the outermost square brackets
    inputArg = inputArg.substr(1, inputArg.size() - 2);

  vector<int> result = take_int(inputArg);
    int ind=0;
   vector<vector<int>> initial=vector<vector<int>>(4, vector<int>(4));
   for(int i=0;i<4;i++)
   for(int j=0;j<4;j++)
   initial[i][j]=result[ind++];
 
    //vector<vector<int>> initial = {{4,12,7,3},{14,0,2,8},{6,10,5,11},{15,1,9,13}};
   // vector<vector<int>> initial = {{4,12,5,9},{3,1,2,11},{15,7,10,6},{14,13,0,8}};
    //vector<vector<int>> initial = {{15,14,13,12},{11,10,9,8},{7,6,5,4},{0,3,2,1}};
    vector<vector<int>> target = {{1,2,3,4},{5,6,7,8},{9,10,11,12},{13,14,15,0}};
    vector<vector<int>> leaf1 = {{1,2,3,4},{5,6,7,8},{9,10,11,12},{13,14,0,15}};
    vector<vector<int>> leaf2 = {{1,2,3,4},{5,6,7,8},{9,10,11,0},{13,14,15,12}};
    int count = nextState(initial,target);

    //printState(mp[target]);
    vector<vector<vector<int>>> path = leaf_to_root_path(mp,target);

    cout<<path.size()<<endl;
    reverse(path.begin(),path.end());
    vector<vector<int>> nextMove = path[1];
    cout<<"[";
    for(int i=0;i<nextMove.size();i++)
      for(int j=0;j<nextMove[i].size();j++)
        {  
            cout<<nextMove[i][j];
            if(i==3 && j==3){}
            else cout<<",";
        }
    cout<<"]";
    return 0;
}