import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt


data = pd.read_csv('processed.csv')
corr = data.corr()
print(corr)

sns.heatmap(corr)
plt.show()

