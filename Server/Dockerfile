FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["CookEase.Api/CookEase.Api.csproj", "CookEase.Api/"]
RUN dotnet restore "CookEase.Api/CookEase.Api.csproj"
COPY . .
WORKDIR "/src/CookEase.Api"
RUN dotnet build "CookEase.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CookEase.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CookEase.Api.dll"]