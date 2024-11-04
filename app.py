from flask import Flask, render_template, request, jsonify
from scipy.stats import binom

app = Flask(__name__)

class GachaSimulator:
    def __init__(self, cost_per_gacha=None, probability=None, target_count=None, target_probability=None):
        self.cost_per_gacha = cost_per_gacha
        self.probability = probability
        self.target_count = target_count
        self.target_probability = target_probability

    def required_attempts_for_probability(self):
        attempts = 1
        while True:
            probability = 1 - binom.cdf(self.target_count - 1, attempts, self.probability)
            if probability >= self.target_probability:
                return attempts
            attempts += 1

    def calculate_budget(self):
        required_attempts = self.required_attempts_for_probability()
        required_budget = required_attempts * self.cost_per_gacha
        return required_budget

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json

    cost_per_gacha = int(data.get('costPerGacha', 0)) if 'costPerGacha' in data else None
    probability = float(data.get('probability', 0)) / 100 if 'probability' in data else None
    target_count = int(data.get('target_count', 0)) if 'target_count' in data else None
    target_probability = float(data.get('target_probability', 0)) / 100 if 'target_probability' in data else None

    simulator = GachaSimulator(cost_per_gacha, probability, target_count, target_probability)
    result = simulator.calculate_budget()

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
