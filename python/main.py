from flask import Flask, request, jsonify, send_file
from flask import g
from flask_cors import CORS
import json
from BeamBase import BeamBase
from DrawBase import DrawBeam
import io

app = Flask(__name__)
CORS(app)  # Allowing all origins

def calc_result(width, height, agressClass, quantBar, dBar, dAgreg, dEstribo, av):
    try:
        # Converting data to numbers
        width = float(width)
        height = float(height)
        quantBar = int(quantBar)  # Convert to integer for BeamBase class
        dBar = float(dBar)
        dAgreg = float(dAgreg)
        dEstribo = float(dEstribo)
        av = float(av)

        # Perform calculations
        bar = BeamBase(width, height, agressClass, quantBar, dBar, dAgreg, dEstribo, av)
        bar.CalcBarArea()
        print(bar.CalcBarArea())
        draw = DrawBeam(bar)
        draw.DrawBeam(True, True)
        
        saved_image_path = draw.SaveFig()  # Save the figure and get the path

        return bar.CalcBarArea(), saved_image_path  # Return the path to the saved image
    except Exception as e:
        return None

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        # Receive data from POST request
        data = request.json

        # Calculate and generate image
        calc_area, image_path = calc_result(data['width'], 
                                            data['height'], 
                                            data['agressClass'], 
                                            data['quantBar'],
                                            data['dBar'], 
                                            data['dAgreg'], 
                                            data['dEstribo'], 
                                            data['av'])
        
        print("Caminho da imagem: " + image_path)
        print("CalcBarArea: " + str(calc_area))
        
        print("Dados antes do jsonify: ", {'calc_area': calc_area, 'image_path': image_path})

        # Criar objeto JSON usando jsonify
        json_data = jsonify({'calc_area': calc_area, 'image_path': image_path})

        # Extrair o conteúdo da resposta Flask como uma string
        json_string = json_data.get_data(as_text=True)
        print("Teste Jsonify: ", json_string)
        
        if image_path and calc_area:
            json = jsonify({'calc_area': calc_area, 'image_path': image_path})
            print("Teste Jsonify: ", json)
            # Send the generated image back to the client along with the calculated area
            return jsonify({'calc_area': calc_area, 'image_path': image_path}), 200
        else:
            return jsonify({'error': 'Failed to generate image.'}), 500
    except Exception as e:
        print(str(e))  # Print the exception for debugging
        return jsonify({'error': 'An error occurred during request processing.'}), 500

if __name__ == '__main__':
    app.run(debug=True)