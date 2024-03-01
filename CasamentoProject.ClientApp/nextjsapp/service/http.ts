export default class Http {
  async post<TRequest, TResponse>(
    url: string,
    body: TRequest
  ): Promise<TResponse> {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data: TResponse = await response.json();
    return data;
  }

  async get<TResponse>(url: string): Promise<TResponse> {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data: TResponse = await response.json();
    return data;
  }

  async delete<TRequest>(url: string, id: string): Promise<boolean> {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });

    return response.ok ? true : false;
  }

  async put<TRequest, TResponse>(
    url: string,
    body: TRequest
  ): Promise<TResponse> {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data: TResponse = await response.json();
    return data;
  }
}
