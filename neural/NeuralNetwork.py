from keras.models import Sequential
from keras.layers import Dense, Dropout
from sklearn.model_selection import train_test_split
import numpy

numpy.random.seed(2)

dataset = numpy.loadtxt("DATASET.csv", delimiter=",")

X = dataset[:,0:2]
Y = dataset[:,2]

x_train, x_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

model = Sequential()
model.add(Dense(15, input_dim=2, activation='relu'))
model.add(Dense(10, activation='relu'))
model.add(Dense(8, activation='relu'))
model.add(Dropout(.2))
model.add(Dense(1, activation='sigmoid'))

model.compile(loss="binary_crossentropy", optimizer="adam", metrics=['accuracy'])

model.fit(x_train, y_train, epochs = 8000, batch_size=20, validation_data=(x_test, y_test))

scores = model.evaluate(X, Y)
secondScores = model.evaluate(x_test, y_test)

if (scores < secondScores):
   print("Доход чиновников, возможно, увеличиться на " + "\n%s: %.2f%%" % (model.metrics_names[1], scores[1]*10))

else:
   print("Доход чиновников, возможно, уменьшиться на " + "\n%s: %.2f%%" % (model.metrics_names[1], scores[1]*10))

model.save('weights.h5')
