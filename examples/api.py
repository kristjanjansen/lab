import vanguard
import time
import math

parameters = {
    "epochs": 100,
    "learning_rate": 0.001,
    "dropout": 0.5,
    "note": "Some random note about the experiment"
}

client = vanguard.Client("http://localhost:5080", parameters, "Project Name", "Experiment Name",
                         "Project Description")

client.send_note(client.args.note)

score = None

plot1 = client.create_plot(chart_type="line", ylabel="Amplitude")
plot2 = client.create_plot(chart_type="line", ylabel="Amplitude")

for i in range(client.args.epochs):
    plot1.send_update("cos", i/4, math.cos(i/4))
    plot1.send_update("sin", i/4, math.sin(i/4))

    # Sawtooth
    plot2.send_update("Sawtooth", i * client.args.learning_rate, (i * client.args.learning_rate) % 1)


    print("Log line", i)
    score = (i * client.args.learning_rate) % 1
    time.sleep(0.1)

# this sends metric value for understanding how well your algorithm is doing
client.send_metric("Score", score)
