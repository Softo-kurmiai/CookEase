using Application.Enums;

namespace Application.DTOs.Recipe;

public class RecipeMetricsUpdateRequest
{
    public required RecipeMetrics Metric { get; set; }
}