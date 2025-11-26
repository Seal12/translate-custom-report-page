import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI
        return {
            hasError: true,
            error,
            errorInfo: null,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log the error to console for debugging
        console.error("ErrorBoundary caught an error:", error, errorInfo);
        
        // Update state with error details
        this.setState({
            error,
            errorInfo,
        });
    }

    handleReset = () => {
        // Reset error boundary state
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
    };

    render() {
        if (this.state.hasError) {
            const styles = {
                container: {
                    display: "flex",
                    flexDirection: "column" as "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                    padding: "2rem",
                    backgroundColor: "#052e39",
                    color: "#fff",
                },
                errorBox: {
                    backgroundColor: "#064c60",
                    border: "1px solid #E53E3E",
                    borderRadius: "8px",
                    padding: "2rem",
                    maxWidth: "600px",
                    width: "100%",
                },
                title: {
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    marginBottom: "1rem",
                    color: "#FED7D7",
                },
                message: {
                    fontSize: "1rem",
                    marginBottom: "1.5rem",
                    lineHeight: "1.5",
                },
                details: {
                    fontSize: "0.875rem",
                    backgroundColor: "#052e39",
                    padding: "1rem",
                    borderRadius: "4px",
                    marginBottom: "1.5rem",
                    fontFamily: "monospace",
                    overflow: "auto",
                    maxHeight: "200px",
                },
                button: {
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "#0075b1",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    fontSize: "1rem",
                    cursor: "pointer",
                    fontWeight: 500,
                },
            };

            return (
                <div style={styles.container}>
                    <div style={styles.errorBox}>
                        <h1 style={styles.title}>Something went wrong</h1>
                        <p style={styles.message}>
                            The application encountered an unexpected error. 
                            Please try refreshing the page or contact support if the problem persists.
                        </p>
                        {process.env.NODE_ENV === "development" && this.state.error && (
                            <div style={styles.details}>
                                <strong>Error:</strong> {this.state.error.toString()}
                                {this.state.errorInfo && (
                                    <div style={{ marginTop: "1rem" }}>
                                        <strong>Component Stack:</strong>
                                        <pre style={{ marginTop: "0.5rem", whiteSpace: "pre-wrap" }}>
                                            {this.state.errorInfo.componentStack}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        )}
                        <button style={styles.button} onClick={this.handleReset}>
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

