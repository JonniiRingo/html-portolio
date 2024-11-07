import torch
import torch.nn as nn
import torch.nn.functional as F
import math

class ParametricSurfaceTransformerLayer(nn.Module):
    def __init__(self, input_dim, model_dim, num_heads, num_layers, dropout=0.1):
        super(ParametricSurfaceTransformerLayer, self).__init__()

        # Parameters
        self.input_dim = input_dim
        self.model_dim = model_dim
        self.num_heads = num_heads
        self.num_layers = num_layers
        self.dropout = dropout

        # Layers for transformer architecture (Embedding, Attention, and Feedforward)
        self.embedding = nn.Linear(input_dim, model_dim)
        self.attention_layers = nn.ModuleList([self._build_attention_layer() for _ in range(num_layers)])
        self.position_encoding = self._generate_position_encoding(model_dim)

        # Final output layer
        self.output_layer = nn.Linear(model_dim, input_dim)

    def _generate_position_encoding(self, model_dim):
        """
        Generate sinusoidal position encoding based on the model dimension.
        """
        position_encoding = torch.zeros(5000, model_dim)
        for pos in range(5000):
            for i in range(0, model_dim, 2):
                position_encoding[pos, i] = math.sin(pos / (10000 ** (i / model_dim)))
                position_encoding[pos, i + 1] = math.cos(pos / (10000 ** (i / model_dim)))
        return position_encoding

    def _build_attention_layer(self):
        """
        Builds a single attention layer with multi-head attention mechanism.
        """
        attention = nn.MultiheadAttention(embed_dim=self.model_dim, num_heads=self.num_heads, dropout=self.dropout)
        return attention

    def _parametric_surface_embedding(self, token_embeddings):
        """
        Parametric surface function to model multi-dimensional embeddings.
        Tokens are represented as surfaces in 3D space.
        """
        u, v = token_embeddings[:, :, 0], token_embeddings[:, :, 1]
        f_x = torch.sin(u) * torch.cos(v)  # Example surface function for X
        f_y = torch.sin(v) * torch.cos(u)  # Example surface function for Y
        f_z = torch.cos(u) * torch.cos(v)  # Example surface function for Z
        
        surface_embedding = torch.stack([f_x, f_y, f_z], dim=-1)  # Stack to form 3D embedding
        return surface_embedding

    def forward(self, x):
        # Apply initial embedding layer
        x = self.embedding(x)

        # Add position encoding
        position_encoding = self.position_encoding[:x.size(0), :]
        x = x + position_encoding

        # Pass through the attention layers with parametric surface embedding
        for i in range(self.num_layers):
            attn_layer = self.attention_layers[i]
            x = self._parametric_surface_embedding(x)  # Parametric surface embedding

            # Apply multi-head attention
            attn_output, _ = attn_layer(x, x, x)
            x = attn_output + x  # Residual connection

            # Feedforward layer
            x = F.relu(x)
            x = F.dropout(x, p=self.dropout, training=self.training)

        # Apply final output layer
        output = self.output_layer(x)
        return output

# Instantiate and test the model
input_dim = 256  # Example input dimension (e.g., token embeddings)
model_dim = 512  # Embedding dimension in the transformer layer
num_heads = 8    # Number of attention heads
num_layers = 6   # Number of transformer layers

model = ParametricSurfaceTransformerLayer(input_dim, model_dim, num_heads, num_layers)

# Simulate input data (batch_size, seq_len, input_dim)
x = torch.rand(32, 10, input_dim)  # Batch of 32 sequences, each of length 10

# Forward pass
output = model(x)
print(f"Output shape: {output.shape}")
