from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/health')
def health():
    return jsonify({
        "status": "ok",
        "project": "land-acquisition-&-title-due-d"
    })

if __name__ == "__main__":
    app.run(debug=True)