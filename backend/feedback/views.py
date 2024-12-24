from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product, Feedback, Client
from .serializers import ProductSerializer, FeedbackSerializer, ClientSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Feedback
from .serializers import FeedbackSerializer

@api_view(['GET'])
def product_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
def feedback(request):
    if request.method == 'GET':
        feedbacks = Feedback.objects.all()
        serializer = FeedbackSerializer(feedbacks, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        client = request.data.get('client')
        product = request.data.get('product')
        
        # Check if feedback already exists for the client and product
        try:
            feedback = Feedback.objects.get(client=client, product=product)
            serializer = FeedbackSerializer(feedback, data=request.data)
        except Feedback.DoesNotExist:
            serializer = FeedbackSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)



@api_view(['GET'])
def client_list(request):
    clients = Client.objects.all()
    serializer = ClientSerializer(clients, many=True)
    return Response(serializer.data)