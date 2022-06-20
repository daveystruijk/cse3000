import pandas as pd
import plotly.graph_objects as go

data = pd.read_csv('processed.csv')

x0=data.query('inputMethod == "mouse"')['correct'].values
print("Mouse:")
print(x0)
x1=data.query('inputMethod == "webcam"')['correct'].values
print("Webcam:")
print(x1)

fig = go.Figure()
fig.add_trace(go.Histogram(
    x=x0,
    histnorm='percent',
    name='Mouse', # name used in legend and hover labels
    nbinsx=10,
    marker_color="#00A6D6",
))
fig.add_trace(go.Histogram(
    x=x1,
    histnorm='percent',
    name='Webcam',
    nbinsx=10,
    marker_color="#A50034",
))

fig.update_layout(
    xaxis_title_text='# of Correct Answers', # xaxis label
    yaxis_title_text='% of Participants', # yaxis label
    xaxis=dict(
        tickmode = 'linear',
        tick0 = 1,
        dtick = 1
    ),
    legend=dict(
        orientation="h",
    ),
    bargap=0.2, # gap between bars of adjacent location coordinates
    bargroupgap=0.1 # gap between bars of the same location coordinates
)

fig.update_layout(template='plotly_white', font_family="Roboto Slab")
fig.write_image('correctness_histogram.svg')
fig.show()

