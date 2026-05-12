import React, { useEffect, useState } from "react";

const COLORS = {
    green: "#94A78E",
    dark: "#1E1E1E",
    white: "#FFFFFF",
    greenLight: "#EDF2EB",
    gray: "#F5F5F3",
    grayText: "#888884",
};

export default function FitUpStore() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [cart, setCart] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/products");
                const data = await res.json();

                setProducts(data);
            } catch (err) {
                console.error("Error cargando productos:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = (product) => {
        setCart((prev) => {
            const exists = prev.find((item) => item.id === product.id);

            if (exists) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            }

            return [...prev, { ...product, qty: 1 }];
        });

        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
        }, 1500);
    };

    const updateQty = (id, delta) => {
        setCart((prev) =>
            prev
                .map((item) => {
                    if (item.id === id) {
                        const newQty = item.qty + delta;

                        return newQty > 0
                            ? { ...item, qty: newQty }
                            : null;
                    }

                    return item;
                })
                .filter(Boolean)
        );
    };

    const totalItems = cart.reduce((s, i) => s + i.qty, 0);

    const totalPrice = cart.reduce(
        (s, i) => s + i.precio * i.qty,
        0
    );

    return (
        <div
            style={{
                minHeight: "100dvh",
                background: "#FFFFFF",
                color: COLORS.dark,
                overflowX: "hidden",
            }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800;900&family=DM+Sans:wght@400;700&display=swap');

                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }

                html, body {
                    overflow-x: hidden;
                    overflow-y: auto;
                    -webkit-overflow-scrolling: touch;
                    touch-action: pan-y;
                    font-family: 'DM Sans', sans-serif;
                    background: white;
                }

                #root {
                    min-height: 100%;
                }

                .product-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                    padding: 20px;
                }

                @media (max-width: 768px) {
                    .product-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 12px;
                        padding: 12px;
                    }
                }

                @keyframes toastSlide {
                    from {
                        opacity: 0;
                        transform: translateX(-50%) translateY(-20px);
                    }

                    to {
                        opacity: 1;
                        transform: translateX(-50%) translateY(0);
                    }
                }

                button {
                    -webkit-tap-highlight-color: transparent;
                }
            `}</style>

            {/* TOAST */}
            {showToast && (
                <div
                    style={{
                        position: "fixed",
                        top: 20,
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: COLORS.dark,
                        color: "white",
                        padding: "12px 24px",
                        borderRadius: "50px",
                        zIndex: 3000,
                        fontSize: "14px",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        animation: "toastSlide 0.3s ease",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                    }}
                >
                    <span style={{ color: COLORS.green }}>●</span>
                    Añadido con éxito
                </div>
            )}

            {/* HEADER */}
            <header
                style={{
                    padding: "40px 24px 20px",
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}
            >
                <h1
                    style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 900,
                        fontSize: "32px",
                    }}
                >
                    FitUp Store
                </h1>
            </header>

            {/* PRODUCTOS */}
            <main
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    paddingBottom: "120px",
                }}
            >
                {loading ? (
                    <div
                        style={{
                            textAlign: "center",
                            padding: "60px",
                            color: COLORS.grayText,
                        }}
                    >
                        Cargando productos...
                    </div>
                ) : (
                    <div className="product-grid">
                        {products.map((p) => (
                            <div
                                key={p.id}
                                style={{
                                    background: "white",
                                    borderRadius: "24px",
                                    padding: "12px",
                                    border: `1px solid ${COLORS.greenLight}`,
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <div
                                    style={{
                                        aspectRatio: "1/1",
                                        background: COLORS.gray,
                                        borderRadius: "18px",
                                        overflow: "hidden",
                                    }}
                                >
                                    <img
                                        src={p.imagen}
                                        alt={p.name}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </div>

                                <h3
                                    style={{
                                        fontFamily: "'Syne', sans-serif",
                                        fontSize: "14px",
                                        margin: "12px 0 8px",
                                    }}
                                >
                                    {p.name}
                                </h3>

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginTop: "auto",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontFamily: "'Syne', sans-serif",
                                            fontWeight: 900,
                                            fontSize: "18px",
                                        }}
                                    >
                                        {Number(p.precio).toFixed(2)}€
                                    </span>

                                    <button
                                        onClick={() => addToCart(p)}
                                        style={{
                                            width: "35px",
                                            height: "35px",
                                            borderRadius: "10px",
                                            border: "none",
                                            background: COLORS.dark,
                                            color: "white",
                                            cursor: "pointer",
                                            fontSize: "20px",
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* BOTON CARRITO */}
            <div
                style={{
                    position: "fixed",
                    bottom: "30px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1000,
                }}
            >
                <button
                    onClick={() => setCartOpen(true)}
                    style={{
                        background: COLORS.dark,
                        color: "white",
                        border: "none",
                        padding: "16px 28px",
                        borderRadius: "50px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                        cursor: "pointer",
                        fontWeight: "bold",
                    }}
                >
                    Ver Carrito

                    {totalItems > 0 && (
                        <span
                            style={{
                                background: COLORS.green,
                                color: COLORS.dark,
                                borderRadius: "50%",
                                width: "22px",
                                height: "22px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "12px",
                            }}
                        >
                            {totalItems}
                        </span>
                    )}
                </button>
            </div>

            {/* DRAWER */}
            {cartOpen && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 2000,
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <div
                        onClick={() => setCartOpen(false)}
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(0,0,0,0.4)",
                            backdropFilter: "blur(4px)",
                        }}
                    />

                    <div
                        style={{
                            position: "relative",
                            width: "min(400px, 100%)",
                            background: "white",
                            height: "100dvh",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            boxShadow: "-10px 0 30px rgba(0,0,0,0.1)",
                        }}
                    >
                        <div
                            style={{
                                padding: "24px",
                                borderBottom: "1px solid #EEE",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <h2
                                style={{
                                    fontFamily: "'Syne', sans-serif",
                                }}
                            >
                                Carrito
                            </h2>

                            <button
                                onClick={() => setCartOpen(false)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    fontSize: "20px",
                                    cursor: "pointer",
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        <div
                            style={{
                                flex: 1,
                                overflowY: "auto",
                                padding: "20px",
                            }}
                        >
                            {cart.length === 0 ? (
                                <div
                                    style={{
                                        color: COLORS.grayText,
                                        textAlign: "center",
                                        marginTop: "40px",
                                    }}
                                >
                                    El carrito está vacío
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div
                                        key={item.id}
                                        style={{
                                            display: "flex",
                                            gap: "15px",
                                            marginBottom: "20px",
                                            alignItems: "center",
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                background: COLORS.gray,
                                                borderRadius: "10px",
                                                overflow: "hidden",
                                            }}
                                        >
                                            <img
                                                src={item.imagen}
                                                alt={item.name}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </div>

                                        <div style={{ flex: 1 }}>
                                            <div
                                                style={{
                                                    fontWeight: "bold",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                {item.name}
                                            </div>

                                            <div
                                                style={{
                                                    fontFamily:
                                                        "'Syne', sans-serif",
                                                }}
                                            >
                                                {item.precio.toFixed(2)} €
                                            </div>
                                        </div>

                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                background: COLORS.gray,
                                                borderRadius: "8px",
                                            }}
                                        >
                                            <button
                                                onClick={() =>
                                                    updateQty(item.id, -1)
                                                }
                                                style={{
                                                    border: "none",
                                                    padding: "5px 10px",
                                                    cursor: "pointer",
                                                    background: "transparent",
                                                }}
                                            >
                                                -
                                            </button>

                                            <span
                                                style={{
                                                    padding: "0 5px",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {item.qty}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    updateQty(item.id, 1)
                                                }
                                                style={{
                                                    border: "none",
                                                    padding: "5px 10px",
                                                    cursor: "pointer",
                                                    background: "transparent",
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div
                            style={{
                                padding: "24px",
                                borderTop: "1px solid #EEE",
                            }}
                        >
                            <button
                                style={{
                                    width: "100%",
                                    background: COLORS.dark,
                                    color: "white",
                                    padding: "16px",
                                    borderRadius: "12px",
                                    border: "none",
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                }}
                            >
                                Pagar · {totalPrice.toFixed(2)} €
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}