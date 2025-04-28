/*GET OFFICER LEADERBOARD*/

DROP PROCEDURE IF EXISTS Parking.OfficerRank;

GO

CREATE PROCEDURE Parking.OfficerRank
    @Month INT,
    @Year INT
    
AS
BEGIN
    SELECT 
        RANK() OVER(ORDER BY SUM(ISNULL(T.Fee, 0)) DESC, COUNT(T.TicketID) DESC) AS OfficerRank,
        O.LastName,
        O.FirstName,
        COUNT(T.TicketID) AS TicketCount,
        SUM(ISNULL(T.Fee, 0)) AS TicketRevenue,
        (
                SELECT TOP 1 l.LotName
            FROM Parking.Tickets t2
            JOIN Parking.Lots l ON t2.LotID = l.LotID
            WHERE t2.OfficerID = o.OfficerID
                AND YEAR(t2.TimeIssued) = @Year
                AND MONTH(t2.TimeIssued) = @Month
            GROUP BY l.LotName
            ORDER BY COUNT(t2.TicketID) DESC
        ) AS TopLot
    FROM Parking.Tickets T
        RIGHT JOIN Parking.Officers O ON O.OfficerID = T.OfficerID
            AND MONTH(T.TimeIssued) = @Month
            AND YEAR(T.TimeIssued) = @Year
    GROUP BY T.OfficerID, O.LastName, O.FirstName, O.OfficerID
    ORDER BY OfficerRank, LastName, FirstName
END;
