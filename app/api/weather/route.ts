import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const apiKey = searchParams.get("apiKey") || process.env.OPENWEATHER_API_KEY;

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "Missing latitude or longitude parameters" },
      { status: 400 },
    );
  }

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing OpenWeatherMap API key" },
      { status: 401 },
    );
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
      {
        headers: {
          "User-Agent": "IfG-UAVs Dashboard/1.0",
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      if (response.status === 401) {
        return NextResponse.json(
          {
            error: "Invalid API key",
            details: errorData.message || "Check your OpenWeatherMap API key",
          },
          { status: 401 },
        );
      } else if (response.status === 429) {
        return NextResponse.json(
          {
            error: "Rate limit exceeded",
            details: errorData.message || "Too many requests",
          },
          { status: 429 },
        );
      } else {
        return NextResponse.json(
          {
            error: `OpenWeatherMap API error`,
            details: errorData.message || response.statusText,
          },
          { status: response.status },
        );
      }
    }

    const weatherData = await response.json();

    // Validate response data
    if (!weatherData.main || !weatherData.weather) {
      return NextResponse.json(
        { error: "Invalid weather data received from API" },
        { status: 502 },
      );
    }

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch weather data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
