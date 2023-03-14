 
#
# Complete the 'FilledBuckets' function below.
# 
# The function is expected to return an INTEGER.
# The function accepts following parameters:
# 1. INTEGER N
# 2. INTEGER ARRAY queries
#

def FilledBuckets(N, queries):
	FilledBuckets = []
	for i in range(N):
		FilledBuckets.append(0)

	for query in queries:
		print(query)
		if query==1:
			FilledBuckets = [1]*N
		elif query==2:
			FilledBuckets[1::2] = [0]*(N//2)
		elif query==3:
			FilledBuckets[::2]=[1]*(N//2)
		else:
			FilledBuckets = [0]*N
		print(FilledBuckets)
	count=0	
	for buk in FilledBuckets:
		if buk==1:
			count+=1
	return count

N=5
queries=[1,2,2]
print(FilledBuckets(N,queries))