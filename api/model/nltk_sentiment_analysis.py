from nltk.sentiment import SentimentIntensityAnalyzer
from nltk import tokenize

sia = SentimentIntensityAnalyzer()

def sentiment_analyzer_scores(text):
    score = sia.polarity_scores(text)
    if score['compound'] >= 0.05:
        return  'Positive'
    elif score['compound'] <= -0.05:
        return 'Negative'
    else:
        return 'Neutral'



