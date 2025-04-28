GO


CREATE OR ALTER PROCEDURE Parking.GetMostCommonPassType
    @StartDate DATETIMEOFFSET,
    @EndDate DATETIMEOFFSET
AS
BEGIN
    SELECT
        pt.PassType,
        COUNT(p.PassID) AS PassCount,
        SUM(pty.Price) AS Revenue
    FROM Parking.Passes p
    JOIN Parking.PassTypeYears pty ON p.PassTypeYearID = pty.PassTypeYearID
    JOIN Parking.PassTypes pt ON pty.PassType = pt.PassType
    WHERE p.TimePurchased BETWEEN @StartDate AND @EndDate
    GROUP BY pt.PassType
    ORDER BY PassCount DESC;
END;