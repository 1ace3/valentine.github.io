/* ===================================
   LUXE Tunisia - Shopify Integration
   =================================== */

/**
 * Shopify Buy Button SDK Configuration
 * 
 * To connect your Shopify store:
 * 1. Go to your Shopify Admin > Apps > Develop apps
 * 2. Create a new app with Storefront API access
 * 3. Get your Storefront API access token
 * 4. Replace the values below with your actual credentials
 */

const SHOPIFY_CONFIG = {
    // Replace with your Shopify store domain (e.g., 'your-store.myshopify.com')
    domain: '28sn4u-i7.myshopify.com',

    // Replace with your Storefront API access token
    storefrontAccessToken: 'your-storefront-access-token',

    // Product IDs to display (replace with your actual product IDs)
    products: {
        glasses: [
            'gid://shopify/Product/1234567890',
            'gid://shopify/Product/1234567891',
            'gid://shopify/Product/1234567892'
        ],
        clothing: [
            'gid://shopify/Product/1234567893',
            'gid://shopify/Product/1234567894',
            'gid://shopify/Product/1234567895'
        ]
    }
};

// Shopify Buy Button SDK initialization
let shopifyClient = null;
let shopifyUI = null;

/**
 * Initialize Shopify Buy Button SDK
 * This will only work when valid credentials are provided
 */
function initShopify() {
    // Check if SDK is loaded
    if (typeof ShopifyBuy === 'undefined') {
        console.warn('Shopify Buy Button SDK not loaded. Products will use local placeholders.');
        return;
    }

    // Check if credentials are configured
    if (SHOPIFY_CONFIG.domain === 'your-store.myshopify.com') {
        console.info('Shopify not configured. Using placeholder products.');
        console.info('To connect Shopify, update SHOPIFY_CONFIG in js/shopify.js');
        return;
    }

    try {
        // Initialize the client
        shopifyClient = ShopifyBuy.buildClient({
            domain: SHOPIFY_CONFIG.domain,
            storefrontAccessToken: SHOPIFY_CONFIG.storefrontAccessToken
        });

        // Initialize UI
        ShopifyBuy.UI.onReady(shopifyClient).then(function (ui) {
            shopifyUI = ui;

            // Create products
            createShopifyProducts();

            // Create cart component
            createShopifyCart();
        });

    } catch (error) {
        console.error('Failed to initialize Shopify:', error);
    }
}

/**
 * Create product components from Shopify
 */
function createShopifyProducts() {
    const productsContainer = document.getElementById('shopify-products');
    if (!productsContainer || !shopifyUI) return;

    // Style configuration for products
    const productOptions = {
        product: {
            styles: {
                product: {
                    '@media (min-width: 601px)': {
                        'max-width': 'calc(25% - 20px)',
                        'margin-left': '20px',
                        'margin-bottom': '50px'
                    }
                },
                title: {
                    'font-family': 'Inter, sans-serif',
                    'font-weight': '500',
                    'color': '#ffffff'
                },
                price: {
                    'font-family': 'Inter, sans-serif',
                    'font-weight': '600',
                    'color': '#d4af37'
                },
                button: {
                    'font-family': 'Inter, sans-serif',
                    'font-weight': '500',
                    'background': 'linear-gradient(135deg, #d4af37 0%, #f4e5b0 50%, #d4af37 100%)',
                    'color': '#000',
                    'border-radius': '9999px',
                    ':hover': {
                        'background': 'linear-gradient(135deg, #e8c547 0%, #f4e5b0 50%, #e8c547 100%)'
                    }
                }
            },
            text: {
                button: 'Add to Cart'
            }
        },
        cart: {
            styles: {
                button: {
                    'font-family': 'Inter, sans-serif',
                    'background': 'linear-gradient(135deg, #d4af37 0%, #f4e5b0 50%, #d4af37 100%)',
                    'color': '#000',
                    'border-radius': '9999px'
                }
            }
        }
    };

    // Create product components for all configured products
    const allProducts = [
        ...SHOPIFY_CONFIG.products.glasses,
        ...SHOPIFY_CONFIG.products.clothing
    ];

    allProducts.forEach(productId => {
        shopifyUI.createComponent('product', {
            id: productId,
            node: productsContainer,
            moneyFormat: '%7B%7Bamount%7D%7D TND',
            options: productOptions
        });
    });
}

/**
 * Create cart component
 */
function createShopifyCart() {
    if (!shopifyUI) return;

    const cartOptions = {
        cart: {
            styles: {
                button: {
                    'font-family': 'Inter, sans-serif',
                    'background': 'linear-gradient(135deg, #d4af37 0%, #f4e5b0 50%, #d4af37 100%)',
                    'color': '#000',
                    'border-radius': '9999px'
                }
            },
            text: {
                total: 'Total',
                button: 'Checkout'
            },
            popup: false
        },
        toggle: {
            styles: {
                toggle: {
                    'background': 'linear-gradient(135deg, #d4af37 0%, #f4e5b0 50%, #d4af37 100%)',
                    'border-radius': '50%'
                },
                count: {
                    'color': '#000',
                    'font-weight': '600'
                }
            }
        }
    };

    // The SDK will automatically create a cart toggle button
    shopifyUI.createComponent('cart', {
        options: cartOptions
    });
}

/**
 * Fetch all products from a collection
 * @param {string} collectionId - The Shopify collection ID
 */
async function fetchCollection(collectionId) {
    if (!shopifyClient) return null;

    try {
        const collection = await shopifyClient.collection.fetchWithProducts(collectionId);
        return collection.products;
    } catch (error) {
        console.error('Failed to fetch collection:', error);
        return null;
    }
}

/**
 * Search products
 * @param {string} query - Search query
 */
async function searchProducts(query) {
    if (!shopifyClient) return null;

    try {
        const products = await shopifyClient.product.fetchQuery({
            query: query
        });
        return products;
    } catch (error) {
        console.error('Failed to search products:', error);
        return null;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initShopify);

// Export for use in other modules
window.ShopifyIntegration = {
    init: initShopify,
    fetchCollection,
    searchProducts,
    config: SHOPIFY_CONFIG
};
