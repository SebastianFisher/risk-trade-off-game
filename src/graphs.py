from matplotlib import pyplot as plt
import random
import numpy as np

x = [i for i in range(8)]
yGrowth = [1, 3, 2, 4, 2, 5, 7, 11]

figure = plt.figure()
plt.plot(x, yGrowth, color="green", linewidth=3)
plt.xlim(0, 7)
plt.ylim(0, 11)
plt.xticks([])
plt.yticks([])
plt.axis("off")
plt.savefig("./images/market-increase.png", bbox_inches="tight", pad_inches=0, transparent=True)

leng = len(yGrowth)
yLoss = [yGrowth[leng-i-1] for i in x]
plt.clf()
plt.plot(x, yLoss, color="red", linewidth=3)
plt.xlim(0, 7)
plt.ylim(0, 11)
plt.xticks([])
plt.yticks([])
plt.axis("off")
plt.savefig("./images/market-decrease.png", bbox_inches="tight", pad_inches=0, transparent=True)

print(yGrowth)